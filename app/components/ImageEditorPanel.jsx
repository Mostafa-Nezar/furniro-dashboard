'use client';

import { useState } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function ImageEditorPanel({ onChange, label = 'Select image(s) to edit' }) {
    const [items, setItems] = useState([]);

    const emitFiles = (nextItems) => {
        if (!onChange) return;

        const files = nextItems
            .map((item) => item.editedFile || item.file)
            .filter(Boolean);

        onChange(files);
    };

    const processItem = async (item) => {
        if (!item?.imageUrl) return;

        const img = new Image();
        img.src = item.imageUrl;

        img.onload = () => {
            const targetWidth = clamp(Number(item.width) || img.naturalWidth, 100, 4000);
            const targetHeight = clamp(Number(item.height) || img.naturalHeight, 100, 4000);
            const zoom = clamp(Number(item.zoom) || 100, 50, 200) / 100;
            const rotate = Number(item.rotate) || 0;
            const cropX = clamp(Number(item.cropX) || 0, 0, 100);
            const cropY = clamp(Number(item.cropY) || 0, 0, 100);
            const cropWidth = clamp(Number(item.cropWidth) || 100, 10, 100);
            const cropHeight = clamp(Number(item.cropHeight) || 100, 10, 100);

            const sourceWidth = img.naturalWidth;
            const sourceHeight = img.naturalHeight;
            const cropLeft = (cropX / 100) * sourceWidth;
            const cropTop = (cropY / 100) * sourceHeight;
            const cropW = (cropWidth / 100) * sourceWidth;
            const cropH = (cropHeight / 100) * sourceHeight;

            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotate * Math.PI) / 180);
            ctx.scale(zoom, zoom);

            const drawWidth = canvas.width / zoom;
            const drawHeight = canvas.height / zoom;
            const offsetX = -drawWidth / 2;
            const offsetY = -drawHeight / 2;

            ctx.drawImage(
                img,
                cropLeft,
                cropTop,
                cropW,
                cropH,
                offsetX,
                offsetY,
                drawWidth,
                drawHeight,
            );

            canvas.toBlob((blob) => {
                if (!blob) return;
                const editedFile = new File([blob], item.file.name, {
                    type: item.file.type || 'image/png',
                });
                const previewUrl = URL.createObjectURL(blob);

                setItems((prev) => {
                    const nextItems = prev.map((existing) =>
                        existing.id === item.id
                            ? { ...existing, editedFile, previewUrl }
                            : existing,
                    );

                    emitFiles(nextItems);
                    return nextItems;
                });
            }, item.file.type || 'image/png', 0.95);
        };
    };

    const handleFiles = async (selectedFiles) => {
        if (!selectedFiles?.length) return;

        const fileList = Array.from(selectedFiles).filter((file) => file.type.startsWith('image/'));
        if (!fileList.length) return;

        const newItems = await Promise.all(
            fileList.map(async (file) => {
                const imageUrl = URL.createObjectURL(file);
                return {
                    id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    file,
                    imageUrl,
                    previewUrl: imageUrl,
                    width: 800,
                    height: 800,
                    zoom: 100,
                    rotate: 0,
                    cropX: 0,
                    cropY: 0,
                    cropWidth: 100,
                    cropHeight: 100,
                    editedFile: file,
                };
            }),
        );

        setItems((prev) => {
            const nextItems = [...prev, ...newItems];
            emitFiles(nextItems);
            return nextItems;
        });

        newItems.forEach((item) => processItem(item));
    };

    const updateItemValue = (id, key, value) => {
        setItems((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, [key]: value } : item,
            );
            const changedItem = updated.find((item) => item.id === id);
            if (changedItem) {
                processItem(changedItem);
            }

            emitFiles(updated);
            return updated;
        });
    };

    const removeItem = (id) => {
        setItems((prev) => {
            const nextItems = prev.filter((item) => item.id !== id);
            emitFiles(nextItems);
            return nextItems;
        });
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">{label}</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                className="w-full text-sm text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500/10 file:text-violet-400 hover:file:bg-violet-500/20 cursor-pointer"
            />

            {items.length > 0 && (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-slate-100">{item.file.name}</p>
                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="text-xs text-red-400 hover:text-red-300"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                                    <img
                                        src={item.previewUrl || item.imageUrl}
                                        alt={item.file.name}
                                        className="w-full max-h-72 object-contain rounded-xl"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="text-xs text-slate-400">
                                            <span className="mb-1 block">Width</span>
                                            <input
                                                type="number"
                                                value={item.width}
                                                min="100"
                                                onChange={(e) => updateItemValue(item.id, 'width', e.target.value)}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                                            />
                                        </label>
                                        <label className="text-xs text-slate-400">
                                            <span className="mb-1 block">Height</span>
                                            <input
                                                type="number"
                                                value={item.height}
                                                min="100"
                                                onChange={(e) => updateItemValue(item.id, 'height', e.target.value)}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                                            />
                                        </label>
                                    </div>

                                    <label className="block text-xs text-slate-400">
                                        <span className="mb-1 block">Zoom</span>
                                        <input
                                            type="range"
                                            min="50"
                                            max="200"
                                            value={item.zoom}
                                            onChange={(e) => updateItemValue(item.id, 'zoom', Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </label>

                                    <label className="block text-xs text-slate-400">
                                        <span className="mb-1 block">Rotate</span>
                                        <input
                                            type="range"
                                            min="-180"
                                            max="180"
                                            value={item.rotate}
                                            onChange={(e) => updateItemValue(item.id, 'rotate', Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </label>

                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="text-xs text-slate-400">
                                            <span className="mb-1 block">Crop X</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={item.cropX}
                                                onChange={(e) => updateItemValue(item.id, 'cropX', Number(e.target.value))}
                                                className="w-full"
                                            />
                                        </label>
                                        <label className="text-xs text-slate-400">
                                            <span className="mb-1 block">Crop Y</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={item.cropY}
                                                onChange={(e) => updateItemValue(item.id, 'cropY', Number(e.target.value))}
                                                className="w-full"
                                            />
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="text-xs text-slate-400">
                                            <span className="mb-1 block">Crop Width</span>
                                            <input
                                                type="range"
                                                min="10"
                                                max="100"
                                                value={item.cropWidth}
                                                onChange={(e) => updateItemValue(item.id, 'cropWidth', Number(e.target.value))}
                                                className="w-full"
                                            />
                                        </label>
                                        <label className="text-xs text-slate-400">
                                            <span className="mb-1 block">Crop Height</span>
                                            <input
                                                type="range"
                                                min="10"
                                                max="100"
                                                value={item.cropHeight}
                                                onChange={(e) => updateItemValue(item.id, 'cropHeight', Number(e.target.value))}
                                                className="w-full"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

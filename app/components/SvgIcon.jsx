import React from "react";

const icons = {
    lineChart: (
        <>
            <polyline points="4 16 9 10 14 13 20 6" />
        </>
    ),
    barChart: (
        <>
            <rect x="4" y="9" width="4" height="11" />
            <rect x="10" y="5" width="4" height="15" />
            <rect x="16" y="12" width="4" height="8" />
        </>
    ),
    areaChart: (
        <>
            <path d="M4 17L9 12L14 14L20 7V20H4Z" />
        </>
    ),
    pieChart: (
        <>
            <path d="M12 2A10 10 0 1 0 22 12H12V2Z" />
            <path d="M12 12V2" />
        </>
    ),
    radar: (
        <>
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="8" />
            <path d="M12 2L12 22M2 12L22 12" />
        </>
    ),
    scatter: (
        <>
            <circle cx="7" cy="17" r="1.5" />
            <circle cx="11" cy="9" r="1.5" />
            <circle cx="17" cy="14" r="1.5" />
            <circle cx="15" cy="6" r="1.5" />
        </>
    ),
    composed: (
        <>
            <rect x="3" y="13" width="4" height="8" />
            <rect x="10" y="9" width="4" height="12" />
            <rect x="17" y="5" width="4" height="16" />
            <polyline points="3 17 10 10 14 13 21 6" />
        </>
    ),
    radial: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 12L12 3" />
            <path d="M12 12L19 12" />
            <path d="M12 12L7 18" />
        </>
    ),
    treemap: (
        <>
            <rect x="3" y="3" width="8" height="8" />
            <rect x="13" y="3" width="8" height="5" />
            <rect x="3" y="13" width="5" height="8" />
            <rect x="10" y="13" width="11" height="8" />
        </>
    ),
    sankey: (
        <>
            <rect x="3" y="6" width="6" height="4" />
            <rect x="9" y="12" width="12" height="4" />
            <rect x="3" y="18" width="6" height="4" />
            <path d="M9 8H14M9 14H18M9 20H19" />
        </>
    ),
    funnel: (
        <>
            <path d="M3 4H21L14 12V19H10V12L3 4Z" />
        </>
    ),
    stackedArea: (
        <>
            <path d="M3 17L8 13L13 15L18 10L21 7V20H3Z" />
        </>
    ),
    dashboard: (
        <>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="4" />
            <rect x="14" y="9" width="7" height="11" />
            <rect x="3" y="14" width="7" height="6" />
        </>
    ),
    documentation: (
        <>
            <path d="M5 3H15L21 9V21H5V3Z" />
            <path d="M15 3V9H21" />
            <path d="M7 13H17" />
            <path d="M7 17H13" />
        </>
    ),
    components: (
        <>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2V5" />
            <path d="M12 19V22" />
            <path d="M2 12H5" />
            <path d="M19 12H22" />
            <path d="M4.2 4.2L6.3 6.3" />
            <path d="M17.7 17.7L19.8 19.8" />
            <path d="M4.2 19.8L6.3 17.7" />
            <path d="M17.7 6.3L19.8 4.2" />
        </>
    ),
    default: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
        </>
    ),
};

const SvgIcon = ({ type = "default", className = "w-5 h-5", title }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
    >
        {title ? <title>{title}</title> : null}
        {icons[type] || icons.default}
    </svg>
);

export default SvgIcon;

import './StatusPill.css';

export type StatusType =
    | 'AVAILABLE'
    | 'ON_TRIP'
    | 'IN_SHOP'
    | 'RETIRED'
    | 'ON_DUTY'
    | 'OFF_DUTY'
    | 'SUSPENDED'
    | 'DRAFT'
    | 'DISPATCHED'
    | 'COMPLETED'
    | 'CANCELLED';

interface StatusPillProps {
    status: StatusType;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
    AVAILABLE: { label: 'Available', className: 'pill-success' },
    ON_TRIP: { label: 'On Trip', className: 'pill-info' },
    IN_SHOP: { label: 'In Shop', className: 'pill-warning' },
    RETIRED: { label: 'Retired', className: 'pill-danger' },

    ON_DUTY: { label: 'On Duty', className: 'pill-success' },
    OFF_DUTY: { label: 'Off Duty', className: 'pill-secondary' },
    SUSPENDED: { label: 'Suspended', className: 'pill-danger' },

    DRAFT: { label: 'Draft', className: 'pill-secondary' },
    DISPATCHED: { label: 'Dispatched', className: 'pill-info' },
    COMPLETED: { label: 'Completed', className: 'pill-success' },
    CANCELLED: { label: 'Cancelled', className: 'pill-danger' },
};

export function StatusPill({ status }: StatusPillProps) {
    const config = statusConfig[status];
    if (!config) return <span className="status-pill pill-secondary">{status}</span>;

    return (
        <span className={`status-pill ${config.className}`}>
            {config.label}
        </span>
    );
}

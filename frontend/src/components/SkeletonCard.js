import './Skeleton.css';

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-img"></div>
            <div className="skeleton-text title"></div>
            <div className="skeleton-text price"></div>
            <div className="skeleton-btn"></div>
        </div>
    );
}

export default SkeletonCard;

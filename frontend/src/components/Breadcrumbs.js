import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

function Breadcrumbs({ customCrumbs }) {
    const location = useLocation();

    // If custom crumbs are provided, use them. Otherwise, build from path.
    // customCrumbs shape: [{ label: 'Shop', path: '/shop' }, { label: 'Electronics', path: '/category/Electronics' }, ...]

    let crumbs = [];

    if (customCrumbs) {
        crumbs = customCrumbs;
    } else {
        const pathnames = location.pathname.split("/").filter((x) => x);
        crumbs = pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const label = name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()); // Format correctly
            return {
                label: decodeURIComponent(label),
                path: routeTo
            };
        });
    }

    return (
        <nav className="breadcrumbs-wrapper">
            <ol className="breadcrumbs-list">
                <li>
                    <Link to="/" className="breadcrumb-link home-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </Link>
                </li>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <li key={crumb.path} className="breadcrumb-item">
                            <span className="breadcrumb-separator">/</span>
                            {isLast ? (
                                <span className="breadcrumb-current">{crumb.label}</span>
                            ) : (
                                <Link to={crumb.path} className="breadcrumb-link">
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;

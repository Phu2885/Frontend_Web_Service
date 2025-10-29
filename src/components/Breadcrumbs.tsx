import { FC } from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbsProps {
  crumbs: BreadcrumbItem[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="breadcrumbs">
      <div className="container">
        <Link to="/" className="breadcrumb-home">Главная</Link>
        {crumbs.length > 0 && crumbs.map((crumb, index) => (
          <span key={index} className="breadcrumb-item">
            <span className="breadcrumb-separator">/</span>
            {index === crumbs.length - 1 ? (
              <span className="breadcrumb-current">{crumb.label}</span>
            ) : (
              <Link to={crumb.path || '#'} className="breadcrumb-link">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumbs
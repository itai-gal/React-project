import "./Ui/DynamicPageHeade.css"

type DynamicPageHeaderProps = {
    header: string
}

export const DynamicPageHeader = ({ header }: DynamicPageHeaderProps) => {
    return (
        <div className="center">{header}</div>
    )
}
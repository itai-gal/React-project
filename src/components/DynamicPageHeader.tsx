type DynamicPageHeaderProps = {
    header: string
}

export const DynamicPageHeader = ({ header }: DynamicPageHeaderProps) => {
    return (
        <div>{header}</div>
    )
}
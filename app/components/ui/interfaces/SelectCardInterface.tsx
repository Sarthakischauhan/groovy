export interface Option {
    id: string
    title: string
    desc: string
    icon: Element 
}

export interface CardSelectProps {
    options: Option[]
    onSelect: (selectedId: string) => void
}
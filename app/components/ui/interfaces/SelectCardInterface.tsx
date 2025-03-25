export interface Option {
    id: string
    title: string
    desc: string
    icon: React.ReactNode; 
}

export interface CardSelectProps {
    options: Option[]
    onSelect: (selectedId: string) => void
}
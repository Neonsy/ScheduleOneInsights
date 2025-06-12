export interface NavSubItem {
    readonly name: string;
    readonly href: string;
    readonly description?: string;
    readonly isWip?: boolean;
}

export interface NavItem {
    readonly name: string;
    readonly href: string;
    readonly subPaths?: readonly NavSubItem[];
    readonly isWip?: boolean;
}

export const textCapitalizer = (text: string, displayName: string, isCapsOnly?: boolean) => {
    const disp = text ? text : displayName;
    return isCapsOnly ? disp?.toUpperCase() : disp;
}
function removeEmptyOb(obj: any) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export default removeEmptyOb
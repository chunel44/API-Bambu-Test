

export const createSlug = (value: string): string => {
    const slug = value.toLowerCase().replace(/^\s+|\s+$/gm, '');
    return slug.replace(/\s+/g, '-');
}

export const slugToText = (slug: string): string => {
    return slug.replace('-', ' ');
}
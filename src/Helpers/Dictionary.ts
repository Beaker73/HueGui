export type Dictionary<T> = { [key: string]: T };

export function filterDictionary<T>(dict: Dictionary<T>, condition: (item: T) => boolean): Dictionary<T> {
    return Object.fromEntries(
        Object.entries(dict)
            .filter(([key, value]) => condition(value))
    );
}
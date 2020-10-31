export type Dictionary<T> = { [key: string]: T };

export function filter<T>(dict: Dictionary<T>, condition: (item: T) => boolean): Dictionary<T> {
    return Object.fromEntries(
        Object.entries(dict)
            .filter(([key, value]) => condition(value))
    );
}

export function map<T, S>(dict: Dictionary<T>, convert: (item: T) => S): Dictionary<S> {
    return Object.fromEntries(
        Object.entries(dict)
            .map(([key, value]) => ([key, convert(value)]))
    );
}

export function mapEntries<T,S>(dict: Dictionary<T>, convert: (key: string, item: T) => [string, S]): Dictionary<S> {
    return Object.fromEntries(
        Object.entries(dict)
            .map(([key, value]) => convert(key, value))
    );
}

export function filterMap<T, S>(dict: Dictionary<T>, condition: (item: T) => boolean, convert: (item: T) => S): Dictionary<S> {
    return Object.fromEntries(
        Object.entries(dict)
            .filter(([key, value]) => condition(value))
            .map(([key, value]) => ([key, convert(value)]))
    );
}

export function some<T>(dict: Dictionary<T>, condition: (item: T) => boolean): boolean {
    return Object.values(dict)
        .some(item => condition(item));
}

export function every<T>(dict: Dictionary<T>, condition: (item: T) => boolean): boolean {
    return Object.values(dict)
        .every(item => condition(item));
}

export function count<T>(dict: Dictionary<T>, condition?: (item: T) => boolean): number {
    let values = Object.values(dict);
    if (condition)
        values = values.filter(condition);
    return values.length;
}

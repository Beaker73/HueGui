type ToStoreModelCall<ApiModel, StoreModel, Props = undefined> =
    Props extends {}
    ? (apiModel: ApiModel, props: Props) => StoreModel
    : (apiModel: ApiModel) => StoreModel;

export interface ModelConverter<ApiModel, StoreModel, Props = undefined> {
    toStoreModel: ToStoreModelCall<ApiModel, StoreModel, Props>;
    toApiModel: (storeModel: StoreModel) => ApiModel;
}

export type StringIdConvertProps = { id: string; }
export type NumberIdConvertProps = { id: number; }
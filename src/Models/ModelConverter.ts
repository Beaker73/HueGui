export interface ModelConverter<ApiModel, StoreModel> {
    toStoreModel: (apiModel: ApiModel) => StoreModel;
    toApiModel: (storeModel: StoreModel) => ApiModel;
}

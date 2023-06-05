export type OrderStatus = "pending";

export type OrderLIneItemMetadata = {
    key: string,
    value: string
}

export type OrderLIneItem = {
    product_id: number,
    quantity: number,
    meta_data: OrderLIneItemMetadata[]
}

export type Order = {
    status: OrderStatus,
    line_items: OrderLIneItem[]
}
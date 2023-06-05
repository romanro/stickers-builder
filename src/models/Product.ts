import { Attribute } from './Attribute'

export type Product = {
    id: number,
    name: string,
    attributes: Attribute[]
}

export const PRODUCT_ID = 5551;
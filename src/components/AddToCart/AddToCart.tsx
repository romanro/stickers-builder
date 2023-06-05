import React, { FC, useEffect, useState } from 'react';
import { StickerPreviewProps } from '../StickerPreview/StickerPreview';
import { Order } from '../../models/Order';
import { PRODUCT_ID } from '../../models/Product';
import { useMutation } from 'react-query';
import API from '../../api/api';
import { GetAPIResponse } from '../../api/api.models';
import { LoadingButton } from './LoadingButton';

type AddToCartProps = Omit<StickerPreviewProps, 'size' | 'sizes'>

export const AddToCart: FC<AddToCartProps> = ({ text, icon, fontSettings }) => {

    const [order, setOrder] = useState<Order | undefined>(undefined)

    const { mutate, isLoading, isSuccess } = useMutation('postOrders', async () => await API.post<GetAPIResponse<Order>>("orders", order), {
        onSuccess: (data: GetAPIResponse<Order>) => {
            console.log({ data });
            //   const message = "success"
            //  alert(message)
        },
        onError: () => {
            alert("there was an error")
        },
    });


    useEffect(() => {
        if (order) {
            const cartItems = JSON.parse(localStorage?.getItem('cartItems') || '[]') || [];

            cartItems.push(order);

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

        }
    }, [order])

    const onAddToCart = () => {
        const newOrder: Order = {
            status: 'pending',
            line_items: [
                {
                    product_id: PRODUCT_ID,
                    quantity: 1,
                    meta_data: [
                        {
                            key: "text",
                            value: text || ''
                        },
                        {
                            key: "icon",
                            value: icon
                        },
                        {
                            key: "fontFamily",
                            value: fontSettings.fontFamily
                        },
                        {
                            key: "isCapsOnly",
                            value: fontSettings.isCapsOnly ? "Yes" : "No"
                        },
                        {
                            key: "textColor",
                            value: fontSettings.textColor
                        },
                        {
                            key: "image",
                            value: ""
                        }
                    ]

                }

            ]

        }

        setOrder(newOrder)

    }

    return <div>
        <LoadingButton label={'הוספה לסל'} isLoading={isLoading} isDisabled={!text || isLoading} onClick={onAddToCart} />
    </div>;
};


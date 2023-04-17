import './App.scss';

import React, { useEffect, useState } from 'react';

import { StickerFontSettings, StickerPreview, StickerPreviewProps, StickerTextSelector, TextInput } from './components';
import { Output } from './models/Output';
import { DEFAULT_FONT_SETTINGS, DEFAULT_ICON, DEFAULT_SIZE, DEFAULT_TEXT } from './consts/text.consts';
import { SupportedIcon } from './components/StickerPreview/Icons/Icons.models';
import { sizes } from './consts/config.consts';
import { StickerSizeId } from './models/Sticker';

//import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { QueryClient, QueryClientProvider } from 'react-query';



// const api = new WooCommerceRestApi({
//     url: "https://decalproject.com",
//     consumerKey: process.env.REACT_APP_WOO_API_KEY || '',
//     consumerSecret: process.env.REACT_APP_WOO_SECRET_API_KEY || '',
//     version: "wc/v3",
//     queryStringAuth: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'),
//     // axiosConfig: {
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //         'Access-Control-Allow-Origin': '*'
//     //     }
//     // }
// });




function App() {
    const queryClient = new QueryClient();

    const [fontSettings, setFontSettings] = useState<StickerFontSettings>(DEFAULT_FONT_SETTINGS);
    const [text, setText] = useState(DEFAULT_TEXT);
    const [icon, setIcon] = useState<SupportedIcon | undefined>(DEFAULT_ICON);
    const [size, setSize] = useState<StickerSizeId>(DEFAULT_SIZE);

    const urlParams = new URLSearchParams(window.location.search);
    const initialState = urlParams.get('initialState');

    // useEffect(() => {
    //     fetchOrders();
    // }, []);

    // let fetchOrders = () => {
    //     api
    //         .get("products/attributes/4/terms", {
    //             per_page: 20,
    //         })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //             }
    //         })
    //         .catch((error) => { console.error(error) });
    // };




    useEffect(() => {
        if (initialState) {
            const settings: StickerPreviewProps = JSON.parse(initialState);
            setFontSettings(settings.fontSettings);
            setText(settings.text || '');
            setIcon(settings.icon)
        }

    }, [initialState])

    useEffect(() => {
        const output: Output = {
            fontSettings, text, icon
        }

        window.parent.postMessage(JSON.stringify(output), '*')

    }, [fontSettings, text, icon])

    const updateFontSettings = (fs: StickerFontSettings) => {
        setFontSettings({ ...fs });
    };

    const updateText = (t: string) => {
        setText(t);
    }

    const updateIcon = (icon: SupportedIcon | undefined) => {
        setIcon(icon);
    }

    const updateSize = (id: StickerSizeId) => {
        setSize(id);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className='App'>
                <div className='column-1'>
                    <StickerPreview size={size} sizes={sizes} icon={icon} text={text} fontSettings={fontSettings} />
                </div>
                <div className='column-2'>
                    <TextInput maxLength={24} text={text} onInputChange={updateText} />
                    {/* <StickerSizePicker size={size} sizes={sizes} onSizeSelected={updateSize} />
                <IconPicker selectedIcon={icon} textColor={fontSettings.textColor} selectIcon={updateIcon} /> */}
                    <StickerTextSelector text={text} fontSettings={fontSettings} onTextChange={updateFontSettings} />
                </div>
            </div>
        </QueryClientProvider>

    );
}

export default App;

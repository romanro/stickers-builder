import './App.scss';

import React, { useEffect, useState } from 'react';

import { StickerFontSettings, StickerPreview, StickerPreviewProps, StickerTextSelector, TextInput, IconPicker } from './components';
import { Output } from './models/Output';
import { DEFAULT_FONT_SETTINGS, DEFAULT_ICON, DEFAULT_TEXT } from './consts/text.consts';
import { SupportedIcon } from './components/StickerPreview/Icons/Icons.models';

//import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';


// const api = new WooCommerceRestApi({
//     url: "https://decalproject.com",
//     consumerKey: process.env.REACT_APP_WOO_API_KEY || '',
//     consumerSecret: process.env.REACT_APP_WOO_SECRET_API_KEY || '',
//     version: "wc/v3",
//     axiosConfig: {
//         headers: {
//             'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
//         }
//     }
// });




function App() {
    const [fontSettings, setFontSettings] = useState<StickerFontSettings>(DEFAULT_FONT_SETTINGS);
    const [text, setText] = useState(DEFAULT_TEXT);
    const [icon, setIcon] = useState<SupportedIcon | undefined>(DEFAULT_ICON);

    const urlParams = new URLSearchParams(window.location.search);
    const initialState = urlParams.get('initialState');

    // useEffect(() => {
    //     fetchOrders();
    // }, [initialState]);

    // let fetchOrders = () => {
    //     api
    //         .get("products", {
    //             per_page: 20,
    //         })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //             }
    //         })
    //         .catch((error) => { });
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

    const updateFontSettings = (fontSettings: StickerFontSettings) => {
        setFontSettings({ ...fontSettings });
    };

    const updateText = (t: string) => {
        setText(t);
    }

    const upadteIcon = (icon: SupportedIcon | undefined) => {
        setIcon(icon);
    }

    return (
        <div className='App'>
            <StickerPreview icon={icon} text={fontSettings.isCapsOnly ? text.toUpperCase() : text} fontSettings={fontSettings} />
            <div className="control">
                <TextInput text={text} onInputChange={updateText} />
            </div>
            <div className="control">
                {/* <label>
                <input type='checkbox' checked={showIcon} onChange={() => updateIcon(!showIcon)} />
                Show Instagram logo
            </label> */}
                <IconPicker selectedIcon={icon} textColor={fontSettings.textColor} selectIcon={upadteIcon} />
            </div>

            <StickerTextSelector text={text} fontSettings={fontSettings} onTextChange={updateFontSettings} />
        </div>

    );
}

export default App;

import './App.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { AddToCart, IconPicker, StickerFontSettings, StickerPreview, StickerTextSelector, TextInput } from './components';
import { Output } from './models/Output';
import { DEFAULT_FONT_SETTINGS, DEFAULT_ICON, DEFAULT_SIZE, DEFAULT_TEXT } from './consts/text.consts';
import { SupportedIcon } from './components/StickerPreview/Icons/Icons.models';
import { sizes } from './consts/config.consts';
import { StickerSizeId } from './models/Sticker';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
    const queryClient = new QueryClient();

    const [fontSettings, setFontSettings] = useState<StickerFontSettings>(DEFAULT_FONT_SETTINGS);
    const [text, setText] = useState(DEFAULT_TEXT);
    const [icon, setIcon] = useState<SupportedIcon>(DEFAULT_ICON);
    const [size, setSize] = useState<StickerSizeId>(DEFAULT_SIZE);

    // const urlParams = new URLSearchParams(window.location.search);
    // const initialState = urlParams.get('initialState');

    const fullVersion = useMemo(() => (window as any)?.fullVersion, [(window as any)?.fullVersion]);


    // useEffect(() => {
    //     if (initialState) {
    //         const settings: StickerPreviewProps = JSON.parse(initialState);
    //         setFontSettings(settings.fontSettings);
    //         setText(settings.text || '');
    //         setIcon(settings.icon)
    //     }

    // }, [initialState])

    useEffect(() => {
        const output: Output = {
            ...fontSettings, text, icon
        }

        window.parent.postMessage(JSON.stringify(output), '*')

    }, [fontSettings, text, icon])

    const updateFontSettings = (fs: StickerFontSettings) => {
        setFontSettings({ ...fs });
    };

    const updateText = (t: string) => {
        setText(t);
    }

    const updateIcon = (icon: SupportedIcon) => {
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
                    {fullVersion === true ? <>
                        {/* <StickerSizePicker size={size} sizes={sizes} onSizeSelected={updateSize} /> */}
                        <IconPicker selectedIcon={icon} textColor={fontSettings.textColor} selectIcon={updateIcon} />
                    </> : null}
                    <StickerTextSelector text={text} fontSettings={fontSettings} onTextChange={updateFontSettings} />
                    {fullVersion === true ? <AddToCart icon={icon} text={text} fontSettings={fontSettings} /> : null}
                </div>
            </div>
        </QueryClientProvider>

    );
}

export default App;

import './App.scss';

import React, { useEffect, useState } from 'react';

import { StickerFontSettings, StickerPreview, StickerTextSelector } from './components';
import { Output } from './models/Output';

const DEFAULT_TEXT = 'Example SVG';

function App() {
    const [fontSettings, setFontSettings] = useState<StickerFontSettings>({
        fontFamily: 'Poppins',
        textColor: '#B0000D',
    });

    const [text, setText] = useState(DEFAULT_TEXT);
    const [showIcon, setShowIcon] = useState(true);

    useEffect(() => {
        const output: Output = {
            fontSettings, text, showIcon
        }

        window.parent.postMessage(JSON.stringify(output), '*');

    }, [fontSettings, text, showIcon])

    const updateFontSettings = (fontSettings: StickerFontSettings) => {
        setFontSettings({ ...fontSettings });

    };

    const updateText = (t: string) => {
        setText(t);
    }

    const updateIcon = (s: boolean) => {
        setShowIcon(s);
    }



    return (
        <div className='App'>
            <StickerPreview showIcon={showIcon} text={text} fontSettings={fontSettings} />
            <div>
                <input type='text' value={text} onChange={(e) => updateText(e.target.value)} />
            </div>
            <div>
                <label>
                    <input type='checkbox' checked={showIcon} onChange={() => updateIcon(!showIcon)} />
                    Show Instagram logo
                </label>
            </div>

            <StickerTextSelector fontSettings={fontSettings} onTextChange={updateFontSettings} />
        </div>
    );
}

export default App;

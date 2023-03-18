document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementsByClassName('variations_form')[0];
    const iframe = document.getElementById('decal_builder_iframe');

    const setup = {
        initialState: {
            fontSettings: {
                fontFamily: 'Anton',
                textColor: '#B0000D',
            },
            text: 'Example',
            showIcon: true,
        },
    };

    const fieldsMap = {
        custom_decal_text: 'text',
        custom_decal_show_icon: 'showIcon',
        custom_decal_font_family: 'fontSettings.fontFamily',
        custom_decal_font_text_color: 'fontSettings.textColor',
    };

    const getValue = (obj, path, def) =>
        (() => (typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.')))()
            .split('.')
            .filter(Boolean)
            .every((step) => (obj = obj[step]) !== undefined)
            ? obj
            : def;

    const setFieldValue = (name, value) => {
        document.getElementById(name).value = value;
        document.getElementById(name).setAttribute('value', value);
    };

    const createInputElement = (name) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.id = name;
        input.value = '';
        return input;
    };

    const createCustomDecalForm = () => {
        const parent = document.getElementsByClassName('woocommerce-variation-add-to-cart')[0];
        Object.keys(fieldsMap).forEach((field) => parent.appendChild(createInputElement(field)));
    };

    //  createCustomDecalForm(setup);

    const setIframeQueryParams = (params) => {
        const baseWidgetUrl = iframe.src.split('?')[0];
        const queryString = Object.keys(params)
            .map((key) => key + '=' + encodeURIComponent(JSON.stringify(params[key])))
            .join('&');

        iframe.src = `${baseWidgetUrl}?${queryString}`;
    };

    const setFormData = (widget_data) => {
        const variation_id = Number(document.getElementsByName('variation_id')[0].value);

        const product_variations = JSON.parse(form.getAttribute('data-product_variations'));

        const varIndex = product_variations.findIndex((v) => v.variation_id === variation_id);

        Object.entries(fieldsMap).forEach(([key, value]) => {
            const val = getValue(widget_data, value);
            if (val) {
                setFieldValue(key, val);
                if (product_variations?.[varIndex]?.attributes) {
                    product_variations[varIndex].attributes[key] = val;
                }
            }
        });

        form.setAttribute('data-product_variations', JSON.stringify(product_variations));
    };

    window.addEventListener('message', (m) => {
        try {
            const widget_data = { ...JSON.parse(m.data) };
            setFormData(widget_data);
        } catch (error) {}
    });

    setFormData(setup.initialState);
    setIframeQueryParams(setup);
});

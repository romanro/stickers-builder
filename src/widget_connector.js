(function () {
    let widget_data;
    const form = document.getElementsByClassName('variations_form')[0];

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
        input.type = 'text';
        input.name = name;
        input.id = name;
        input.value = '';
        return input;
    };

    const createCustomDecalForm = () => {
        const parent = document.getElementsByClassName('woocommerce-variation-add-to-cart')[0];

        Object.keys(fieldsMap).forEach((field) => parent.appendChild(createInputElement(field)));
    };

    createCustomDecalForm();

    window.addEventListener('message', (m) => {
        widget_data = { ...JSON.parse(m.data) };

        const variation_id = Number(document.getElementsByName('variation_id')[0].value);

        const product_variations = JSON.parse(form.getAttribute('data-product_variations'));

        const varIndex = product_variations.findIndex((v) => v.variation_id === variation_id);

        Object.entries(fieldsMap).forEach(([key, value]) => {
            const val = getValue(widget_data, value);
            setFieldValue(key, val);
            product_variations[varIndex].attributes[key] = val;
        });

        form.setAttribute('data-product_variations', JSON.stringify(product_variations));
    });
})();

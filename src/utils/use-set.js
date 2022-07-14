import {useMemo, useState} from "react";

export const useSet = initialValue => {
    const [set, setSet] = useState(new Set(initialValue));

    const actions = useMemo(
        () => ({
            add: item => setSet(prevSet => {
                console.log("prevSet:", prevSet)
                return new Set([...prevSet, item])
            }),
            remove: item =>
                setSet(prevSet => new Set([...prevSet].filter(i => i !== item))),
            clear: () => setSet(new Set()),
        }),
        [setSet]
    );

    return [set, actions];
}

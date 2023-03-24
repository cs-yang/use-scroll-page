import { useRef, useState, useCallback, useEffect } from 'react';

const useScrollPage = () => {
    const pageRef = useRef({ total: 0, current: 0, offsetWidth: 0 });
    const [enableBtn, setEnableBtn] = useState({ prev: false, next: false });
    const visibleRef = useRef(false);
    const nodeRef = useRef();
    const refCallback = useCallback((node) => {
        nodeRef.current = node;
        if (node) {
            const { scrollWidth, offsetWidth } = node;
            if (offsetWidth > 0) {
                // 取挣 因为current 0 开始
                const total = (scrollWidth / offsetWidth) | 0;
                pageRef.current = {
                    total,
                    current: 0,
                    offsetWidth,
                };
                visibleRef.current = scrollWidth / offsetWidth > 1;
                setEnableBtn({
                    prev: false,
                    // 宽度比大于1不显示
                    next: scrollWidth / offsetWidth > 1,
                });
            }
        }
    }, []);
    const handleScroll = useCallback((e) => {
        const { scrollLeft, offsetWidth, scrollWidth } = e.target;
        let current;
        if (scrollLeft <= offsetWidth) {
            // 没有滚动到最边还可以向右
            current = scrollLeft === 0 ? 0 : 1;
        }
        // total = 1 时也就是区域等于2时比较特殊
        else if (pageRef.current.total === 1) {
            //滑动到结尾
            if (scrollWidth - offsetWidth === scrollLeft) {
                current = 1;
            }
            else {
                current = 0;
            }
        }
        else {
            // 最后一个滑块范围剩余是否在最后一个滑块范围内， 在最后内没到最后仍然可以滑动
            const lastSliderRange = [(pageRef.current.total - 1) * offsetWidth, scrollWidth - offsetWidth];
            //在最后一个滑块内还没到边 倒是第一个节点位置也不能 + 1
            if (scrollLeft >= lastSliderRange[0] && scrollLeft < lastSliderRange[1]) {
                current = (scrollLeft / offsetWidth) | 0;
            }
            else {
                current = ((scrollLeft / offsetWidth) | 0) + 1;
            }
        }
        pageRef.current.current = current;
        setEnableBtn({
            prev: pageRef.current.current > 0,
            next: pageRef.current.current < pageRef.current.total,
        });
    }, []);
    const handlePrev = useCallback(() => {
        var _a, _b;
        if (pageRef.current.current > 0) {
            pageRef.current.current--;
            (_b = (_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo) === null || _b === void 0 ? void 0 : _b.call(_a, pageRef.current.current * pageRef.current.offsetWidth, 0);
        }
    }, []);
    const handleNext = useCallback(() => {
        var _a, _b;
        if (pageRef.current.current + 1 <= pageRef.current.total) {
            pageRef.current.current++;
            (_b = (_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo) === null || _b === void 0 ? void 0 : _b.call(_a, pageRef.current.current * pageRef.current.offsetWidth, 0);
        }
    }, []);
    useEffect(() => {
        if (!nodeRef.current)
            return;
        const observer = new ResizeObserver((entries => {
            if (entries[0]) {
                refCallback(entries[0].target);
            }
        }));
        observer.observe(nodeRef.current);
        return () => observer.disconnect();
    }, []);
    return {
        refCallback,
        onScroll: handleScroll,
        onPrev: handlePrev,
        onNext: handleNext,
        prev: enableBtn.prev,
        next: enableBtn.next,
        visible: visibleRef.current,
    };
};

export { useScrollPage as default };

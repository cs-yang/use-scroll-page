### 滑动分页hooks使用指南
![预览效果](./demo.jpg)
```jsx
import useScrollPage from "use-scroll-page"
const NodeDiv = () => {
    const {
        refCallback,
        onNext, //下一步
        onPrev, //上一步
        prev, // 前一个按钮可用
        next, // 后一个按钮可用
        total, //共多少页
        current, // 默认0页
        onScroll,
        visible, //是否可见
    } = useScrollPage();
    console.log("total", total, current, prev, next);
    return (
        <div>
            <button
                onClick={onPrev}
                disabled={!prev}
            >
                prev
            </button>
            <button
                onClick={onNext}
                disabled={!next}
            >
                next
            </button>

            <div style={{ width: 200 }}>
                <div
                    style={{ overflowX: "scroll", display: "flex" }}
                    ref={refCallback}
                    onScroll={onScroll}
                >
                    <img
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={{ width: 100 }}
                    />
                    <img
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={{ width: 100 }}
                    />
                    <img
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={{ width: 100 }}
                    />
                    <img
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={{ width: 100 }}
                    />
                    <img
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={{ width: 100 }}
                    />
                </div>
            </div>
        </div>
    );
};
```

// text 为需要过滤展示高亮的文本
// searchKey 为搜索框里输入的关键key
const renderHighLightText = (text, searchKey) => {
    const { searchKey } = props;
    if (
      searchKey &&
      searchKey.length &&
      text.indexOf(searchKey) > -1 &&
      searchKey !== text
    ) {
      const temp = text.split(searchKey);
      const dom = [];
      for (let i = 0; i < temp.length - 0.5; i += 0.5) {
        if (Math.floor(i) !== i) {
          dom.push(
              // #3370FF 为高亮的颜色
            <span key={i} style={{ margin: '0', color: '#3370FF' }}>
              {searchKey}
            </span>,
          );
        } else if (temp[i].length) {
          dom.push(
            <span style={{ margin: '0' }} key={i}>
              {temp[i]}
            </span>,
          );
        }
      }
      return dom;
    } else {
      return (
        <span
        // #3370FF 为高亮的颜色
          style={{ color: text == searchKey ? '#3370FF' : '', margin: '0' }}
        >
          {text}
        </span>
      );
    }
  };
export function onTableRowHover(record: any, index?: number) {
  return {
    onMouseEnter: () => {
      const rows = document.querySelectorAll('.ant-table-row');
      if (typeof index === 'number' && rows[index]) {
        rows[index].classList.add('row-hovered');
        rows[index].classList.add('row-pop-animation');
      }
    },
    onMouseLeave: () => {
      const rows = document.querySelectorAll('.ant-table-row');
      if (typeof index === 'number' && rows[index]) {
        rows[index].classList.remove('row-hovered');
        rows[index].classList.remove('row-pop-animation');
      }
    },
  };
} 
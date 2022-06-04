import React, { useCallback, useRef, useState } from 'react';
import styles from './select.module.scss';
import { useOnClickOutside } from './../../../hooks/useOnClickOutside';

const Select = ({ selected, setSelected, options }) => {
  const [isActive, setIsActive] = useState(false);

  const ref = useRef();

  const open = useCallback(
    (e) => {
      setIsActive(!isActive);
    },
    [isActive]
  );

  const close = () => {
    setIsActive(false);
  };

  useOnClickOutside(ref, close);

  const onSelectChange = useCallback(
    (e) => {
      setSelected(e.target.id);
      setIsActive(false);
    },
    [selected]
  );

  return (
    <div className={styles.select + ' select'} ref={ref}>
      <button onClick={open} className={styles.selectBtn + ' nonselect'}>
        {selected || '-'}
      </button>

      {isActive && (
        <ul className={styles.selectList}>
          {options.map((option) => (
            <li
              className={styles.selectItem}
              key={option.id}
              onClick={onSelectChange}
              id={option.id}
            >
              {option.title || option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;

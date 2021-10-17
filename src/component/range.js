import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './range.css';

const MultiRangeSlider = ({ min, max }) => {
  const [minValor, setMinVal] = useState(min);
  const [maxValor, setMaxVal] = useState(max);
  const minValorRef = useRef(min);
  const maxValorRef = useRef(max);
  const range = useRef(null);

  const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    const minPorcentaje = getPercent(minValor);
    const maxPercent = getPercent(maxValorRef.current);

    if (range.current) {
      range.current.style.left = `${minPorcentaje}%`;
      range.current.style.width = `${maxPercent - minPorcentaje}%`;
    }
  }, [minValor, getPercent]);

  useEffect(() => {
    const minPorcentaje = getPercent(minValorRef.current);
    const maxPorcentaje = getPercent(maxValor);

    if (range.current) {
      range.current.style.width = `${maxPorcentaje - minPorcentaje}%`;
    }
  }, [maxValor, getPercent]);

  return (
    <div className="container animate__animated animate__backInRight">
      <input
        type="range"
        step={0.1}
        min={min}
        max={max}
        value={minValor}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxValor - 1);
          setMinVal(value);
          minValorRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minValor > max - 100 && '5' }}
      />
      <input
        type="range"
        step={0.1}
        min={min}
        max={max}
        value={maxValor}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minValor + 1);
          setMaxVal(value);
          maxValorRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minValor} €</div>
        <div className="slider__right-value">{maxValor} €</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;

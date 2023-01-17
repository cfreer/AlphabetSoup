import React from 'react';
import './styles.css';

export default function Keyboard() {
  return (
    <div>
      <div class='row'>
        <p class='box'>A</p>
        <p class='box'>A</p>
        <p class='box'>A</p>
        <p class='box last-col'>A</p>
      </div>
      <div class='row'>
        <p class='box'>A</p>
        <p class='box'>A</p>
        <p class='box'>A</p>
        <p class='box last-col'>A</p>
      </div>
      <div class='row'>
        <p class='box'>A</p>
        <p class='box'>A</p>
        <p class='box'>A</p>
        <p class='box last-col'>A</p>
      </div>
      <div class='row'>
        <p class='box last-row'>A</p>
        <p class='box last-row'>A</p>
        <p class='box last-row'>A</p>
        <p class='box last-col last-row'>A</p>
      </div>
    </div>
  )
}

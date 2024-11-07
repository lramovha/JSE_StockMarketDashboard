// frontend/src/components/StockDetailModal.js
import React from 'react';
import Modal from 'react-modal';
import LineChart from './LineChart';
import './StockDetailModal.css';

Modal.setAppElement('#root');

function StockDetailModal({ isOpen, onClose, stockData }) {
  if (!stockData) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="StockDetailModal">
      <h2>{stockData.symbol} - Details</h2>
      <p>Price: ${stockData.price}</p>
      <p>PE Ratio: {stockData.PE}</p>
      <p>EPS: {stockData.EPS}</p>
      <p>ROIC: {stockData.ROIC}%</p>
      <p>Market Cap: {stockData.marketCap} B</p>
      <LineChart stockData={stockData.history} />
      <button onClick={onClose} className="close-button">Close</button>
    </Modal>
  );
}

export default StockDetailModal;


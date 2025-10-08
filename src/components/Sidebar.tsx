import React from 'react';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <img src="https://via.placeholder.com/150" alt="Chung-Yi.Chi" className="profile-pic" />
      <h3>Chung-Yi.Chi</h3>
      <p>Web Development: LAMP, Laravel, Flask, Auto test with selenium</p>
      <p>Programming Language: C, C++, Python, PHP, JavaScript</p>
      <p>Windows WLAN Driver (NDIS WDI Miniport / NetAdapterCx) & Wi-Fi Firmware (RTOS)</p>
      <p>Debugger: OpenOCD, JTAG, GDB (RISC-V toolchain), WinDbg (a specific tool for BSOD or unknown issue), CodeVise (for both Wi-Fi & BT)</p>
      <p>Misc: Git, CI/CD (Gerrit + Jenkins), Batch/Bash Script, Wi-Fi</p>
    </aside>
  );
};

export default Sidebar;

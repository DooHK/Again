// src/pages/request1.js
import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../utils/PageWrapper';
import { FormContext } from '../contexts/FormContext';

function Request1({ setDirection }) {
  const navigate = useNavigate();
  const scrolled = useRef(false);
  const { formData, setFormData } = useContext(FormContext);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrolled.current && e.deltaY > 30) {
        scrolled.current = true;
        setDirection('down');
        navigate('/request2');
      }
      if (!scrolled.current && e.deltaY < -30) {
        scrolled.current = true;
        setDirection('up');
        navigate('/page3');
      }
    };

    const handleTouch = (() => {
      let startY = 0;
      return (e) => {
        if (e.type === 'touchstart') startY = e.touches[0].clientY;
        if (e.type === 'touchmove') {
          const endY = e.touches[0].clientY;
          const diff = startY - endY;
          if (!scrolled.current && diff > 30) {
            scrolled.current = true;
            setDirection('down');
            navigate('/request2');
          } else if (!scrolled.current && diff < -30) {
            scrolled.current = true;
            setDirection('up');
            navigate('/page3');
          }
        }
      };
    })();

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [navigate, setDirection]);

  return (
    <PageWrapper>
      <div style={styles.container}>
        <div style={styles.textBox}>
          <p style={styles.title}>당신의 전화번호와 이름을 적어주세요.</p>
          <p style={styles.sub}>
            *개인정보는 오로지 서로의 마음이 닿았을 때 알려드리기 위한 용도로만 사용됩니다.
          </p>
        </div>

        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>이름</label>
            <input
              style={styles.input}
              type="text"
              placeholder="이름을 입력해주세요.."
              value={formData.myName}
              onChange={(e) => setFormData({ ...formData, myName: e.target.value })}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>전화번호</label>
            <input
              style={styles.input}
              type="text"
              placeholder="전화번호를 입력해주세요.."
              value={formData.myPhone}
              onChange={(e) => setFormData({ ...formData, myPhone: e.target.value })}
            />
          </div>
        </div>

        <div style={styles.arrowBox}>
          <div style={styles.lineDown} />
          <div style={styles.dot} />
          <p style={styles.arrowText}>아래로</p>
        </div>
      </div>
      <style>
          {`
            input::placeholder {
              color: #603E00;
              opacity: 0.3;
            }
            input::-webkit-input-placeholder {
              color: #603E00;
            }
            input::-moz-placeholder {
              color: #603E00;
              opacity: 0.3;
            }
            input:-ms-input-placeholder {
              color: #603E00;
            }
          `}
        </style>
    </PageWrapper>
  );
}

const styles = {
  container: {
    height: '120vh',
    background: 'linear-gradient(to bottom, #fffaf7, white)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "SM SEMyungJo Std, serif",
    color: '#603E00',
  },
  textBox: {
    textAlign: 'center',
    marginTop: '100px',
  },
  title: {
    fontSize: '25px',
    marginBottom: '10px',
    marginTop: '100px',
  },
  sub: {
    fontSize: '18px',
    color: '#603E00',
  },
  form: {
    marginTop: '60px',
    width: '80%',
    maxWidth: '400px',
  },
  field: {
    marginBottom: '30px',
    display: 'flex',  
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: '20px',
    fontSize: '17px',
    minWidth: '80px',
    textAlign: 'left',
  },
  input: {
    flex: 1,
    border: 'none',
    borderBottom: '1px solid #c6a88c',
    padding: '8px',
    fontSize: '15px',
    backgroundColor: 'transparent',
    color: '#603E00',
    outline: 'none',
  },
  arrowBox: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lineDown: {
    width: '2px',
    height: '150px',
    background: 'linear-gradient(to top, #603E00, transparent)',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#6D4C41',
    borderRadius: '50%',
    marginTop: '0px',
    color : '#603E00',
  },
  arrowText: {
    fontSize: '14px',
    marginTop: '8px',
  },
};

export default Request1;

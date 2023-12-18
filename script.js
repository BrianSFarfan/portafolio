//   // Coloca tu clave de API aquí
//   const API_KEY = '4ede4dcc92e9e841f73651e17b0110bc';
            
//   // Ciudad para la consulta (puedes cambiarlo)
//   const CITY = 'New York';

//   // Construir la URL con los parámetros
//   const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${CITY}`;

//   // Realizar la solicitud a la API utilizando fetch
//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Manipular el DOM para mostrar la información
//       const weatherInfoElement = document.getElementById('weatherInfo');
//       const temperature = data.current.temperature;
//       weatherInfoElement.innerHTML = `<p>Temperature in ${CITY}: ${temperature} &#8451;</p>`;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.getElementById("background").appendChild(canvas);
  
    const particles = [];
    const numParticles = 50;
    const lineThreshold = 100; // Distancia umbral para dibujar líneas
    const transitionSpeed = 0.02; // Velocidad de transición
  
    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          opacity: 0, // Nuevo atributo para controlar la opacidad
        });
      }
  
      animate();
    }
  
    function drawLine(x1, y1, x2, y2, opacity) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.stroke();
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000";
        ctx.fill();
  
        p.x += (p.targetX - p.x) * transitionSpeed;
        p.y += (p.targetY - p.y) * transitionSpeed;
  
        if (Math.abs(p.x - p.targetX) < 1 && Math.abs(p.y - p.targetY) < 1) {
          p.targetX = Math.random() * canvas.width;
          p.targetY = Math.random() * canvas.height;
        }
  
        // Añadido efecto de transición
        p.opacity += transitionSpeed;
        p.opacity = Math.min(1, p.opacity);
  
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p2.x - p.x) ** 2 + (p2.y - p.y) ** 2);
  
          if (distance < lineThreshold) {
            drawLine(p.x, p.y, p2.x, p2.y, p.opacity);
          }
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
  
    init();
  });
  
  
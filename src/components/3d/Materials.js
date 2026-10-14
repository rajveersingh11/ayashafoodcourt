import * as THREE from 'three';

// Procedural texture helpers
function createNoiseTexture(color1 = '#e6a817', color2 = '#d48806') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, 128, 128);
  
  // sprinkle speckles
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const radius = Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.5 ? color2 : '#ffffff22';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Materials definition
export const getMaterials = (platterType = 'brass') => {
  const isBrass = platterType === 'brass';

  return {
    // Platter Material
    platter: new THREE.MeshStandardMaterial({
      color: isBrass ? '#d4af37' : '#e2e8f0',
      metalness: isBrass ? 0.88 : 0.94,
      roughness: isBrass ? 0.26 : 0.16,
      envMapIntensity: 1.5,
    }),

    // Katori (small metal bowls)
    katori: new THREE.MeshStandardMaterial({
      color: isBrass ? '#c9a130' : '#cbd5e1',
      metalness: isBrass ? 0.9 : 0.92,
      roughness: 0.22,
    }),

    // Dal Tadka (Golden yellow with glossy surface & spicy tadka spots)
    dalTadka: new THREE.MeshStandardMaterial({
      color: '#eab308',
      roughness: 0.2,
      metalness: 0.05,
    }),

    // Dal Makhani (Dark rich creamy black lentils)
    dalMakhani: new THREE.MeshStandardMaterial({
      color: '#582b1d',
      roughness: 0.28,
      metalness: 0.05,
    }),

    // Shahi Paneer Gravy (Rich silky orange-red makhani gravy)
    paneerGravy: new THREE.MeshStandardMaterial({
      color: '#ea580c',
      roughness: 0.22,
      metalness: 0.04,
    }),

    // Paneer Cubes (Soft ivory cubes with subtle warm highlights)
    paneerCube: new THREE.MeshStandardMaterial({
      color: '#fffbf0',
      roughness: 0.45,
      metalness: 0.0,
    }),

    // Basmati Rice (Pearly white translucent effect)
    rice: new THREE.MeshStandardMaterial({
      color: '#f8fafc',
      roughness: 0.6,
      metalness: 0.05,
    }),

    // Cumin Seeds (Dark brown specks on jeera rice)
    jeeraSeed: new THREE.MeshStandardMaterial({
      color: '#3e2723',
      roughness: 0.8,
    }),

    // Roti / Flatbread (Warm golden baked whole wheat with charred golden spots)
    roti: new THREE.MeshStandardMaterial({
      color: '#d69e2e',
      roughness: 0.75,
      metalness: 0.0,
    }),

    // Desi Ghee / Butter glaze
    butterGlaze: new THREE.MeshStandardMaterial({
      color: '#fef08a',
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.7,
    }),

    // Fresh Green Coriander garnish
    coriander: new THREE.MeshStandardMaterial({
      color: '#15803d',
      roughness: 0.35,
    }),

    // Red Chili Tadka oil swirl
    chiliOil: new THREE.MeshStandardMaterial({
      color: '#dc2626',
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    }),

    // Fresh Salad (Cucumber green & Onion pink)
    cucumber: new THREE.MeshStandardMaterial({
      color: '#22c55e',
      roughness: 0.3,
    }),
    onion: new THREE.MeshStandardMaterial({
      color: '#f43f5e',
      roughness: 0.4,
    }),

    // Gulab Jamun (Deep golden mahogany brown with glossy sugar syrup)
    gulabJamun: new THREE.MeshStandardMaterial({
      color: '#713f12',
      roughness: 0.18,
      metalness: 0.1,
    }),
    syrup: new THREE.MeshStandardMaterial({
      color: '#ca8a04',
      roughness: 0.05,
      transparent: true,
      opacity: 0.6,
    }),

    // Boondi Raita
    raitaYogurt: new THREE.MeshStandardMaterial({
      color: '#fefce8',
      roughness: 0.25,
    }),
    boondi: new THREE.MeshStandardMaterial({
      color: '#eab308',
      roughness: 0.7,
    }),
  };
};

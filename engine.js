// WaxMath engine - vinyl and turntable math. Pure functions, no DOM.
(function (root) {
  'use strict';

  // Tonearm/cartridge resonance: f (Hz) = 159 / sqrt(effectiveMass_g * compliance_cu).
  function resonance(massG, complianceCu) {
    if (massG <= 0 || complianceCu <= 0) throw new Error('mass and compliance must be positive');
    return 159 / Math.sqrt(massG * complianceCu);
  }

  // Resonance verdict: the 8-12 Hz band is the classic sweet spot.
  function resonanceVerdict(f) {
    if (f < 5) return 'danger zone - footfalls and warps will shake the groove';
    if (f < 8) return 'low - close to record warp frequencies, watch the woofers pump';
    if (f <= 12) return 'sweet spot - warps below, music above';
    if (f <= 15) return 'high - creeping into audible bass, may thicken the low end';
    return 'too high - inside the music band, will color the bass';
  }

  // Linear groove velocity (cm/s) at radius r (cm) and rpm.
  function grooveVelocity(radiusCm, rpm) {
    if (radiusCm <= 0 || rpm <= 0) throw new Error('positive values only');
    return 2 * Math.PI * radiusCm * rpm / 60;
  }

  // Inner-groove distortion verdict from the slowest radius velocity.
  function velocityVerdict(v) {
    if (v >= 40) return 'fast groove - clean tracking, low distortion';
    if (v >= 25) return 'comfortable - good fidelity';
    if (v >= 15) return 'inner-groove zone - sibilance risk rises';
    return 'slow groove - end-of-side distortion territory';
  }

  // Stylus life remaining. lifeHours typical 600-1500.
  function stylusLeft(lifeHours, usedHours) {
    if (lifeHours <= 0 || usedHours < 0) throw new Error('bad inputs');
    return Math.max(0, lifeHours - usedHours);
  }
  function listeningDays(hoursLeft, hoursPerDay) {
    if (hoursPerDay <= 0) throw new Error('bad inputs');
    return hoursLeft / hoursPerDay;
  }

  // Sides per stylus life: one LP side ~ 22 min.
  function sidesPerStylus(lifeHours, sideMinutes) {
    if (lifeHours <= 0 || sideMinutes <= 0) throw new Error('bad inputs');
    return Math.floor(lifeHours * 60 / sideMinutes);
  }

  var api = {
    resonance: resonance,
    resonanceVerdict: resonanceVerdict,
    grooveVelocity: grooveVelocity,
    velocityVerdict: velocityVerdict,
    stylusLeft: stylusLeft,
    listeningDays: listeningDays,
    sidesPerStylus: sidesPerStylus
  };
  root.WaxMath = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);

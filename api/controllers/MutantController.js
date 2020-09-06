const DnaData = require('../models/DnaData');
const mutantSecuences = {
  A: "AAAA",
  T: "TTTT",
  C: "CCCC",
  G: "GGGG"
}
  /**
  * Verify DNA String
  *
  * @route POST /mutant/
  * @group Mutants - Operations about Mutants
  * @operationId verifyDna
  * @produces application/json
  * @param {Dna.model} dna.body.required - Dna
  * @returns {boolean} 200 - true/false Mutant Dna Verification
  * @returns 400 - Bad Request
  * @returns 403 - Forbidden
  * @returns 500 - Internal Server Error
  */
const MutantController = () => {
  const checkDna = async (req, res) => {
    const { body } = req;
    try {
      let dna = body.dna
      if (!validate(dna)){
        return res.status(400).json({msg: "invalid DNA"});
      }

      let DnaDataRow = await DnaData.findOne({
        where: {
          dna: JSON.stringify(dna), 
        }
      })
      if (DnaDataRow) return res.status(400).json({msg: "DNA already verified"});
      let matrixDna = dna.map(function (r) {
        return Object.keys(dna[0]).map(function (c) {
          return r[c];
        });
      })
      //Search by rows
      let secuenceMatch = simpleSearch(dna)
      
      //Search by cols
      let trasposedDna = Object.keys(dna[0]).map(function (c) {
        return dna.map(function (r) {
          return r[c];
        });
      })
      trasposedDna = trasposedDna.map(row => row.join().split(',').join(''))
      secuenceMatch += simpleSearch(trasposedDna)

      //Search in the diagonals
      let reverseDna = matrixDna.map(row => row.reverse())
      secuenceMatch += simpleSearch(getDiagonals(dna))
      secuenceMatch += simpleSearch(getDiagonals(reverseDna))
      let is_mutant = secuenceMatch >= 3 ? true : false
      await DnaData.create({
        dna: dna, 
        is_mutant: is_mutant,
      })
      if (is_mutant){
        return res.status(200).json(true);
      } else {
        return res.status(403).json(false);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
    
  };
  /**
  * Return Stats
  *
  * @route GET /stats
  * @group Mutants - Operations about Mutants
  * @operationId retrieveDnaStats
  * @produces application/json
  * @returns {Stats} 200 - Stats about Mutants
  * @returns 500 - Internal Server Error
  */
   const getStats = async (req, res) => {
    try {
      let totalMutants = await DnaData.findAndCountAll({
        where:{ 
          is_mutant: true,
        }
      })
      let totalHumans = await DnaData.findAndCountAll({
        where:{ 
          is_mutant: false,
        }
      })
      return res.status(200).json({
        count_mutant_dna: totalMutants.count, 
        count_human_dna: totalHumans.count,
        ratio: ratio(totalMutants.count, totalHumans.count)
      });
    
    } catch(err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }

  }



  const simpleSearch = (dna) => {
    let secuenceMatch = 0;
    let secuence = '';
    for (let secuenceIndex = 0; secuenceIndex < dna.length; secuenceIndex++ ){
      secuence = dna[secuenceIndex].toUpperCase()
      if (secuence.includes(mutantSecuences.A) || 
          secuence.includes(mutantSecuences.T) || 
          secuence.includes(mutantSecuences.C) || 
          secuence.includes(mutantSecuences.G)){
        secuenceMatch++
      };
    };
    return secuenceMatch
  };

  const getDiagonals = (m) => {
    var s, x, y, d,
        o = [];
    for (s = 0; s < m.length; s++) {
      d = [];
      for(y = s, x = 0; y >= 0; y--, x++)
        d.push(m[y][x]);
      o.push(d);
    }
    for (s = 1; s < m[0].length; s++) {
      d = [];
      for(y = m.length - 1, x = s; x < m[0].length; y--, x++)
        d.push(m[y][x]);
      o.push(d);
    }
    return o.map(row => row.join().split(',').join(''));
  }

  const validate = (dna) => {
      const count = dna.length
      let valid = true
      for (let s = 0; s < dna.length; s++) {
        if(dna[s].length != count || dna[s].length <= 3){
          valid = false
        }
      }
      return valid
  }

  const ratio = (mutants, humans) => {
    if( (mutants == 0  && humans == 0)) return 0;
    if (humans == 0) return mutants;
    return(mutants/humans).toFixed(2);
  }

  return {
    checkDna,
    getStats
  };
};

module.exports = MutantController;

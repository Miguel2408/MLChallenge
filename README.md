# Mutants Api

The api receives a DNA represented by a matrix of NxN (an array of strings) and verify if the DNA is Mutant or Human

## Api BASE URL

```
https://api-mutants-ml.herokuapp.com/
```

## Api Docs:

```
https://api-mutants-ml.herokuapp.com/api-docs
```

### Endpoints:

 * POST /mutant/ 
   - Request body with DNA
   - Reponse boolean DNA verification result

 * Get /stats
   - Response Mutant and Human DNA amount with ratio

## Examples:

### POST /mutant/ 

```
{
	"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}

```
Response **Status: 200**, true, is a mutant DNA


```
{
	"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCTTA","TCACTG"]
}

```

Response: **Status: 403**, false, is a human DNA

* If the same DNA is sent then the response will be **Status: 400**, DNA already verified

### Get /stats


```
{
    "count_mutant_dna": 40,
    "count_human_dna": 100,
    "ratio": 0.4
}

```


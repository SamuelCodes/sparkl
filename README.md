# SPARQL Explorer

## Queries

### All universities in the US with lat, lng

    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbprop: <http://dbpedia.org/properties/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>

    SELECT ?label ?homepage ?lat ?long ?endowment
    WHERE {
      ?school a <http://schema.org/CollegeOrUniversity>
      { ?school dbo:country dbpedia:United_States }
      UNION
      { ?school dbpprop:country dbpedia:United_States }
      UNION
      { ?school dbpprop:country "U.S."@en }
      UNION
      { ?school dbpprop:country "United States"@en }

      OPTIONAL { ?school rdfs:label ?label .
                 FILTER (LANGMATCHES(LANG(?label), 'en')) }
      OPTIONAL { ?school foaf:homepage ?homepage }
      OPTIONAL { ?school geo:lat ?lat ; geo:long ?long }
      OPTIONAL { ?school dbo:endowment ?endowment }
    }

    limit 100

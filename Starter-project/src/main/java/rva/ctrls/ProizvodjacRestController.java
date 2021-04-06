package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Proizvodjac;
import rva.repository.ProizvodjacRepository;

@RestController
public class ProizvodjacRestController {

	
	@Autowired
	private ProizvodjacRepository proizvodjacRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("proizvodjac")
	public Collection<Proizvodjac> getProizvod() {
		return proizvodjacRepository.findAll();
	}
	
	@GetMapping("proizvodjac/{id}")
	public Proizvodjac getProizvodjac(@PathVariable ("id") Integer id) {
		return  proizvodjacRepository.getOne(id);
	}
	
	@GetMapping("proizvodjacNaziv/{naziv}")
	public Collection<Proizvodjac> getProizvodjacByNaziv(@PathVariable ("naziv") String naziv)
	{
		return proizvodjacRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("proizvodjac")
	public ResponseEntity<Proizvodjac> insertProizvodjac(@RequestBody Proizvodjac proizvodjac)
	{
		if(!proizvodjacRepository.existsById(proizvodjac.getId()))
		{
			proizvodjacRepository.save(proizvodjac);
			return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
		} 
		return new ResponseEntity<Proizvodjac>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("proizvodjac")
	public ResponseEntity<Proizvodjac> updateProizvodjac(@RequestBody Proizvodjac proizvodjac)
	{
		if(!proizvodjacRepository.existsById(proizvodjac.getId()))
		{
			return new ResponseEntity<Proizvodjac>(HttpStatus.CONFLICT);
			
		} 
		proizvodjacRepository.save(proizvodjac);
		return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
	}
	
	@DeleteMapping("proizovdjac/{id}")
	public ResponseEntity<Proizvodjac> deleteProizvodjac(@PathVariable Integer id)
	{
		if(!proizvodjacRepository.existsById(id))
		{
			return new ResponseEntity<Proizvodjac>(HttpStatus.NO_CONTENT);
			
		} 
		jdbcTemplate.execute("DELETE FROM proizvod WHERE proizvodjac="+id);
		proizvodjacRepository.deleteById(id);
		if(id == -100)
		{
			jdbcTemplate.execute("INSERT INTO \"proizvodjac\"(\"id\",\"naziv\",\"adresa\",\"kontakt\") "
					+"VALUES(-100,'Naziv test2','Mira Popare 133','067888999')");
			
		}
		return new ResponseEntity<Proizvodjac>(HttpStatus.OK);
	}

}

package rva.repository;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;

public interface StavkaRacunaRepository extends JpaRepository<StavkaRacuna,Integer> {
	
	Collection<StavkaRacuna> findByRacun(Racun racun);
	Collection <StavkaRacuna> findByCenaLessThanOrderById(BigDecimal cena);
	
	//coalesce(max(redni_broj)+1,1) ==> max pronalazi maximalan redni broj za stavke racuna, ukoliko je vrednost null onda se vraca 1
	@Query(value="select coalesce(max(redni_broj)+1,1) from stavka_racuna where racun=?1",nativeQuery = true)
	Integer nextRbr(Integer racunId);
}

package com.lxisoft.appraisal.repository;

import com.lxisoft.appraisal.domain.Leave;
import com.lxisoft.appraisal.domain.UserExtra;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data  repository for the Leave entity.
 */
//@SuppressWarnings("unused")
@Repository
@Transactional
public interface LeaveRepository extends JpaRepository<Leave, Long> {
	
	List<Leave> findByUserExtraId(Long id);
	List<Leave> findByUserExtraAndDateBetween(UserExtra userExtra, LocalDate second, LocalDate first);
	List<Leave> findAllByDate(LocalDate localDate);
}

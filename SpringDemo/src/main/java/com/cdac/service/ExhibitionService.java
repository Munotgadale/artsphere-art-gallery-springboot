package com.cdac.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Exhibition;
import com.cdac.repository.ExhibitionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExhibitionService {

    @Autowired
    private ExhibitionRepository exhibitionRepository;

    public Exhibition saveExhibition(Exhibition exhibition) {
        return exhibitionRepository.save(exhibition);
    }

    public List<Exhibition> getAllExhibitions() {
        return exhibitionRepository.findAll();
    }

    public Optional<Exhibition> getExhibitionById(int id) {
        return exhibitionRepository.findById(id);
    }

    public Exhibition updateExhibition(Exhibition exhibition) {
    	return exhibitionRepository.save(exhibition);
    }

    public void deleteExhibitionById(int id) {
        exhibitionRepository.deleteById(id);
    }
}

package com.munichre.streamline.product.service;

import com.munichre.streamline.product.api.dto.CreateFormRequestDto;
import com.munichre.streamline.product.api.dto.FieldDto;
import com.munichre.streamline.product.api.dto.FormDto;
import com.munichre.streamline.product.api.dto.FormSectionDto;
import com.munichre.streamline.product.api.dto.FormSectionInput;
import com.munichre.streamline.product.api.dto.UpdateFormRequestDto;
import com.munichre.streamline.product.exception.FieldNotFoundException;
import com.munichre.streamline.product.exception.FormNotFoundException;
import com.munichre.streamline.product.model.Field;
import com.munichre.streamline.product.model.Form;
import com.munichre.streamline.product.model.FormSection;
import com.munichre.streamline.product.repository.FieldRepository;
import com.munichre.streamline.product.repository.FormRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FormService {

  private final FormRepository formRepository;
  private final FieldRepository fieldRepository;

  @Transactional(readOnly = true)
  public List<FormDto> getAllForms() {
    return formRepository.findAll().stream().map(this::toDto).toList();
  }

  @Transactional(readOnly = true)
  public FormDto getForm(UUID id) {
    Form form = formRepository.findById(id).orElseThrow(() -> new FormNotFoundException(id));
    return toDto(form);
  }

  @Transactional
  public FormDto createForm(CreateFormRequestDto request) {
    Form form = new Form();
    form.setName(request.name());
    form.setDescription(request.description());
    form.setSections(new ArrayList<>());

    if (request.sections() != null) {
      for (FormSectionInput sectionInput : request.sections()) {
        FormSection section = buildSection(form, sectionInput);
        form.getSections().add(section);
      }
    }

    Form saved = formRepository.save(form);
    return toDto(saved);
  }

  @Transactional
  public FormDto updateForm(UUID id, UpdateFormRequestDto request) {
    Form form = formRepository.findById(id).orElseThrow(() -> new FormNotFoundException(id));

    form.setName(request.name());
    form.setDescription(request.description());

    form.getSections().clear();

    if (request.sections() != null) {
      for (FormSectionInput sectionInput : request.sections()) {
        FormSection section = buildSection(form, sectionInput);
        form.getSections().add(section);
      }
    }

    Form saved = formRepository.save(form);
    return toDto(saved);
  }

  private FormSection buildSection(Form form, FormSectionInput input) {
    List<Field> fields = new ArrayList<>();
    if (input.fieldIds() != null) {
      for (UUID fieldId : input.fieldIds()) {
        Field field =
            fieldRepository.findById(fieldId).orElseThrow(() -> new FieldNotFoundException(fieldId));
        fields.add(field);
      }
    }

    FormSection section = new FormSection();
    section.setForm(form);
    section.setName(input.name());
    section.setLabel(input.label());
    section.setDisplayOrder(input.displayOrder() != null ? input.displayOrder() : 0);
    section.setFields(fields);
    return section;
  }

  private FormDto toDto(Form form) {
    List<FormSectionDto> sectionDtos =
        form.getSections() != null
            ? form.getSections().stream().map(this::toSectionDto).toList()
            : List.of();
    return new FormDto(form.getId(), form.getName(), form.getDescription(), sectionDtos);
  }

  private FormSectionDto toSectionDto(FormSection section) {
    List<FieldDto> fieldDtos =
        section.getFields() != null
            ? section.getFields().stream()
                .map(
                    f ->
                        new FieldDto(
                            f.getId(),
                            f.getCode(),
                            f.getType(),
                            f.getLabel(),
                            f.getRequired(),
                            f.getRegexPattern(),
                            f.getOptions()))
                .toList()
            : List.of();
    return new FormSectionDto(
        section.getId(),
        section.getName(),
        section.getLabel(),
        section.getDisplayOrder(),
        fieldDtos);
  }
}

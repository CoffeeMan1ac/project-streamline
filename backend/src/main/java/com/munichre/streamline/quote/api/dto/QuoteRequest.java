package com.munichre.streamline.quote.api.dto;

import com.munichre.streamline.quote.model.ApplicantData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record QuoteRequest(@NotNull UUID productId, @Valid @NotNull ApplicantData applicantData) {}

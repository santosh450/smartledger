package com.myfinance.dto;

import com.myfinance.repository.projection.MonthlySummaryProjection;
import com.myfinance.repository.projection.TopItemProjection;
import lombok.Getter;

import java.util.List;

@Getter
public class DashboardResponse {
    private MonthlySummaryProjection summary;
    private List<TopItemProjection> topItems;

    public DashboardResponse(
            MonthlySummaryProjection summary,
            List<TopItemProjection> topItems) {
        this.summary = summary;
        this.topItems = topItems;
    }

}

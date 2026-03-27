const ExcelJS = require('exceljs');

// Load the Excel file
const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('My tickets JFMM.xlsx').then(() => {
  const worksheet = workbook.getWorksheet(1);
  const data = [];

  // Get headers from first row
  const headers = [];
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers.push(cell.value);
  });

  // Get data from subsequent rows
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) { // Skip header row
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[headers[colNumber - 1]] = cell.value;
      });
      data.push(rowData);
    }
  });

  console.log('Sample row keys:', headers);
  console.log('Total rows:', data.length);

  // Function to convert time formats
  function convertTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    // Assume format is HH:MM:SS or similar
    const parts = timeStr.toString().split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parseInt(parts[2]);
      return hours * 60 + minutes + seconds / 60;
    }
    return parseFloat(timeStr) || 0;
  }

  // Process the data
  let totalFRT = 0;
  let totalResolutionTime = 0;
  let count = 0;
  let resolutionCount = 0;

  // Helper to extract a numeric value from a cell that may be a plain number,
  // a formula object with a .result, or a time string like "HH:MM:SS"
  function getCellMinutes(val) {
    if (!val) return 0;
    // Formula object from ExcelJS
    if (typeof val === 'object' && val.result != null) return parseFloat(val.result) || 0;
    // Plain number
    if (typeof val === 'number') return val;
    // Time string "HH:MM:SS"
    return convertTimeToMinutes(val);
  }

  data.forEach(row => {
    // Use actual column names from the Excel
    const rawFrtMins = row['First response time (in mins)'];
    const rawFrtHrs = row['First response time (in hrs)'];
    const rawResHrs = row['Resolution time (in hrs)'];
    const rawResHrs1 = row['Resolution time (in hrs)_1'];

    // FRT: prefer the mins column (already in minutes); fall back to hrs column (convert to minutes)
    const frtMins = getCellMinutes(rawFrtMins);
    const frtFromHrs = convertTimeToMinutes(rawFrtHrs);
    const frt = frtMins > 0 ? frtMins : frtFromHrs;

    // Resolution: hrs column is HH:MM:SS → convert to minutes
    const resMinutes = convertTimeToMinutes(rawResHrs);
    const resMinutes1 = convertTimeToMinutes(rawResHrs1);
    const resTime = resMinutes > 0 ? resMinutes : resMinutes1;

    if (frt > 0) {
      totalFRT += frt;
      count++;
    }
    if (resTime > 0) {
      totalResolutionTime += resTime;
      resolutionCount++;
    }
  });

  console.log('Total Tickets:', data.length);
  console.log('Tickets with FRT:', count);
  console.log('Average FRT (minutes):', count > 0 ? (totalFRT / count).toFixed(2) : 0);
  console.log('Average Resolution Time (minutes):', resolutionCount > 0 ? (totalResolutionTime / resolutionCount).toFixed(2) : 0);

  // Additional metrics
  const statusCounts = {};
  const agentCounts = {};
  const priorityCounts = {};

  let slaFRTMet = 0;
  let slaFRTViolated = 0;
  let slaFRTTotal = 0;
  let slaResolutionMet = 0;
  let slaResolutionViolated = 0;
  let slaResolutionTotal = 0;

  data.forEach(row => {
    const status = row['Status'];
    const agent = row['Agent'];
    const priority = row['Priority'];

    if (status) statusCounts[status] = (statusCounts[status] || 0) + 1;
    if (agent) agentCounts[agent] = (agentCounts[agent] || 0) + 1;
    if (priority) priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;

    // SLA tracking from status columns
    const frtStatus = row['First response status'];
    if (frtStatus) {
      slaFRTTotal++;
      if (frtStatus === 'Within SLA') slaFRTMet++;
      else if (frtStatus === 'SLA Violated') slaFRTViolated++;
    }
    const resStatus = row['Resolution status'];
    if (resStatus) {
      slaResolutionTotal++;
      if (resStatus === 'Within SLA') slaResolutionMet++;
      else if (resStatus === 'SLA Violated') slaResolutionViolated++;
    }
  });

  console.log('\nStatus Breakdown:');
  Object.entries(statusCounts).forEach(([status, count]) => {
    console.log(`${status}: ${count}`);
  });

  console.log('\nTop Agents:');
  Object.entries(agentCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([agent, count]) => {
    console.log(`${agent}: ${count} tickets`);
  });

  console.log('\nPriority Breakdown:');
  Object.entries(priorityCounts).forEach(([priority, count]) => {
    console.log(`${priority}: ${count}`);
  });

  console.log('\nSLA Compliance (from status columns):');
  console.log(`FRT: ${slaFRTMet}/${slaFRTTotal} within SLA (${((slaFRTMet / slaFRTTotal) * 100).toFixed(1)}%)`);
  console.log(`Resolution: ${slaResolutionMet}/${slaResolutionTotal} within SLA (${((slaResolutionMet / slaResolutionTotal) * 100).toFixed(1)}%)`);
  console.log(`FRT Violated: ${slaFRTViolated}, Resolution Violated: ${slaResolutionViolated}`);

  // Export results to JSON
  const results = {
    totalTickets: data.length,
    ticketsWithFRT: count,
    averageFRT: count > 0 ? parseFloat((totalFRT / count).toFixed(2)) : 0,
    averageResolutionTime: resolutionCount > 0 ? parseFloat((totalResolutionTime / resolutionCount).toFixed(2)) : 0,
    statusBreakdown: statusCounts,
    topAgents: Object.entries(agentCounts).sort((a, b) => b[1] - a[1]).slice(0, 5),
    priorityBreakdown: priorityCounts,
    slaCompliance: {
      frtTotal: slaFRTTotal,
      frtMet: slaFRTMet,
      frtPercentage: slaFRTTotal > 0 ? parseFloat(((slaFRTMet / slaFRTTotal) * 100).toFixed(1)) : 0,
      resolutionTotal: slaResolutionTotal,
      resolutionMet: slaResolutionMet,
      resolutionPercentage: slaResolutionTotal > 0 ? parseFloat(((slaResolutionMet / slaResolutionTotal) * 100).toFixed(1)) : 0
    },
    averageResponseTime: (function() {
      let totalInteractions = 0, totalResTimeForResp = 0;
      data.forEach(row => {
        const agentInt = parseInt(row['Agent interactions']) || 0;
        const resMin = convertTimeToMinutes(row['Resolution time (in hrs)']);
        const resMin1 = convertTimeToMinutes(row['Resolution time (in hrs)_1']);
        const resTime = resMin > 0 ? resMin : resMin1;
        if (agentInt > 0 && resTime > 0) {
          totalResTimeForResp += resTime;
          totalInteractions += agentInt;
        }
      });
      return totalInteractions > 0 ? parseFloat((totalResTimeForResp / totalInteractions).toFixed(2)) : 0;
    })(),
    csatScore: (function() {
      let csatSum = 0, csatCount = 0;
      data.forEach(row => {
        const v = parseFloat(row['CSAT Rating']);
        if (v > 0) { csatSum += v; csatCount++; }
      });
      return { average: csatCount > 0 ? parseFloat((csatSum / csatCount).toFixed(2)) : null, count: csatCount };
    })(),
    slaBreaches: {
      frt: slaFRTViolated,
      resolution: slaResolutionViolated,
      total: slaFRTViolated + slaResolutionViolated
    }
  };

  // Create merchant/CSM mapping - collect all unique CSMs per merchant
  const merchantCSMSet = {};
  data.forEach(row => {
    const merchant = row['Merchant'];
    const csm = row['CSM'];
    if (merchant) {
      if (!merchantCSMSet[merchant]) merchantCSMSet[merchant] = new Set();
      if (csm && csm.toString().trim() !== '') {
        merchantCSMSet[merchant].add(csm.toString().trim());
      }
    }
  });
  const merchantCSM = {};
  Object.entries(merchantCSMSet).forEach(([merchant, csmSet]) => {
    merchantCSM[merchant] = csmSet.size > 0 ? Array.from(csmSet).join(', ') : 'Not Assigned';
  });

  // Create agent-specific data
  const agentData = {};
  data.forEach(row => {
    const agent = row['Agent'];
    if (!agent) return;
    
    if (!agentData[agent]) {
      agentData[agent] = {
        totalTickets: 0,
        totalFRT: 0,
        ticketsWithFRT: 0,
        totalResolutionTime: 0,
        statusBreakdown: {},
        priorityBreakdown: {},
        csat: []
      };
    }
    
    agentData[agent].totalTickets++;
    
    const frtMinsA = getCellMinutes(row['First response time (in mins)']);
    const frtFromHrsA = convertTimeToMinutes(row['First response time (in hrs)']);
    const frt = frtMinsA > 0 ? frtMinsA : frtFromHrsA;
    const resMinutesA = convertTimeToMinutes(row['Resolution time (in hrs)']);
    const resMinutesA1 = convertTimeToMinutes(row['Resolution time (in hrs)_1']);
    const resTime = resMinutesA > 0 ? resMinutesA : resMinutesA1;
    
    if (frt > 0) {
      agentData[agent].totalFRT += frt;
      agentData[agent].ticketsWithFRT++;
    }
    if (resTime > 0) {
      agentData[agent].totalResolutionTime += resTime;
      agentData[agent].ticketsWithResolution = (agentData[agent].ticketsWithResolution || 0) + 1;
    }
    
    const status = row['Status'];
    if (status) {
      agentData[agent].statusBreakdown[status] = (agentData[agent].statusBreakdown[status] || 0) + 1;
    }
    
    const priority = row['Priority'];
    if (priority) {
      agentData[agent].priorityBreakdown[priority] = (agentData[agent].priorityBreakdown[priority] || 0) + 1;
    }
    
    const csat = parseFloat(row['CSAT Rating']);
    if (csat) {
      agentData[agent].csat.push(csat);
    }
  });

  // Calculate agent metrics
  Object.keys(agentData).forEach(agent => {
    const agent_info = agentData[agent];
    agent_info.averageFRT = agent_info.ticketsWithFRT > 0 ? agent_info.totalFRT / agent_info.ticketsWithFRT : 0;
    agent_info.averageResolutionTime = agent_info.ticketsWithResolution > 0 ? agent_info.totalResolutionTime / agent_info.ticketsWithResolution : 0;
    agent_info.averageCSAT = agent_info.csat.length > 0 ? (agent_info.csat.reduce((a, b) => a + b, 0) / agent_info.csat.length).toFixed(2) : 'N/A';
    
    let agentFRTMet = 0, agentFRTViolated = 0, agentFRTTotal = 0;
    let agentResMet = 0, agentResViolated = 0, agentResTotal = 0;
    data.forEach(row => {
      if (row['Agent'] === agent) {
        const frtStatus = row['First response status'];
        if (frtStatus) {
          agentFRTTotal++;
          if (frtStatus === 'Within SLA') agentFRTMet++;
          else if (frtStatus === 'SLA Violated') agentFRTViolated++;
        }
        const resStatus = row['Resolution status'];
        if (resStatus) {
          agentResTotal++;
          if (resStatus === 'Within SLA') agentResMet++;
          else if (resStatus === 'SLA Violated') agentResViolated++;
        }
      }
    });
    
    agent_info.slaFRTPercentage = agentFRTTotal > 0 ? ((agentFRTMet / agentFRTTotal) * 100).toFixed(1) : 0;
    agent_info.slaResolutionPercentage = agentResTotal > 0 ? ((agentResMet / agentResTotal) * 100).toFixed(1) : 0;
    agent_info.slaFRTMet = agentFRTMet;
    agent_info.slaResolutionMet = agentResMet;
    agent_info.slaFRTTotal = agentFRTTotal;
    agent_info.slaResolutionTotal = agentResTotal;

    // Per-agent additional metrics
    const agentRows = data.filter(r => r['Agent'] === agent);

    // Weekly volume
    const agentWeekly = {};
    agentRows.forEach(row => {
      const createdTime = row['Created time'];
      if (createdTime) {
        let dateStr = createdTime;
        if (typeof createdTime === 'object' && createdTime.getTime) {
          dateStr = createdTime.toISOString().split('T')[0];
        } else {
          dateStr = String(createdTime).split(' ')[0];
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - date.getDay());
          const weekKey = startOfWeek.toISOString().split('T')[0];
          agentWeekly[weekKey] = (agentWeekly[weekKey] || 0) + 1;
        }
      }
    });
    agent_info.weeklyTicketVolume = Object.entries(agentWeekly)
      .map(([week, count]) => ({ week, count }))
      .sort((a, b) => new Date(a.week) - new Date(b.week));

    // Top categories
    const agentCategories = {};
    agentRows.forEach(row => {
      const category = row['Type'];
      if (category && category.trim()) {
        agentCategories[category] = (agentCategories[category] || 0) + 1;
      }
    });
    agent_info.topCategories = Object.entries(agentCategories)
      .map(([category, count]) => [category, count])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Resolved percentage
    const agentClosed = agentRows.filter(r => r['Status'] === 'Closed').length;
    agent_info.resolvedPercentage = ((agentClosed / agent_info.totalTickets) * 100).toFixed(1);

    // Average response time
    let agentTotalInteractions = 0, agentTotalResForResp = 0;
    agentRows.forEach(row => {
      const interactions = parseInt(row['Agent interactions']) || 0;
      const resMin = convertTimeToMinutes(row['Resolution time (in hrs)']);
      const resMin1 = convertTimeToMinutes(row['Resolution time (in hrs)_1']);
      const resTime = resMin > 0 ? resMin : resMin1;
      if (interactions > 0 && resTime > 0) {
        agentTotalResForResp += resTime;
        agentTotalInteractions += interactions;
      }
    });
    agent_info.averageResponseTime = agentTotalInteractions > 0 ? parseFloat((agentTotalResForResp / agentTotalInteractions).toFixed(2)) : 0;

    // CSAT score
    agent_info.csatScore = {
      average: agent_info.csat.length > 0 ? parseFloat((agent_info.csat.reduce((a, b) => a + b, 0) / agent_info.csat.length).toFixed(2)) : null,
      count: agent_info.csat.length
    };

    // SLA breaches
    agent_info.slaBreaches = { frt: agentFRTViolated, resolution: agentResViolated, total: agentFRTViolated + agentResViolated };
  });

  results.merchantCSM = merchantCSM;
  results.agentData = agentData;
  
  // Calculate resolved percentage
  const closedTickets = data.filter(row => row['Status'] === 'Closed').length;
  results.resolvedPercentage = ((closedTickets / data.length) * 100).toFixed(1);
  
  // Calculate weekly ticket volume
  const weeklyData = {};
  data.forEach(row => {
    const createdTime = row['Created time'];
    if (createdTime) {
      let dateStr = createdTime;
      if (typeof createdTime === 'object' && createdTime.getTime) {
        dateStr = createdTime.toISOString().split('T')[0];
      } else {
        dateStr = String(createdTime).split(' ')[0];
      }
      
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const weekKey = startOfWeek.toISOString().split('T')[0];
        
        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + 1;
      }
    }
  });
  
  // Convert to array and sort by date
  const weeklyArray = Object.entries(weeklyData)
    .map(([week, count]) => ({ week, count }))
    .sort((a, b) => new Date(a.week) - new Date(b.week));
  
  results.weeklyTicketVolume = weeklyArray;
  
  // Calculate top categories by volume
  const categoryData = {};
  data.forEach(row => {
    const category = row['Type'];
    if (category && category.trim()) {
      categoryData[category] = (categoryData[category] || 0) + 1;
    }
  });
  
  // Convert to array and sort by volume
  const topCategories = Object.entries(categoryData)
    .map(([category, count]) => [category, count])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 categories
  
  results.topCategories = topCategories;

  const fs = require('fs');
  fs.writeFileSync('dashboard-results.json', JSON.stringify(results, null, 2));
  console.log('\nResults exported to dashboard-results.json');

}).catch(err => {
  console.error('Error reading Excel file:', err);
});
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { translateText } from "../../../Utils";
import { RankType } from "./GameInfoRanking";

const economyRankings = new Set([
  RankType.TotalGold,
  RankType.StolenGold,
  RankType.ConqueredGold,
  RankType.TradedGold,
]);

function isEconomyRanking(rankType: RankType): boolean {
  return economyRankings.has(rankType);
}

const bombRankings = new Set([RankType.Atoms, RankType.Hydros, RankType.MIRV]);

function isBombRanking(rankType: RankType): boolean {
  return bombRankings.has(rankType);
}

const warRankings = new Set([
  RankType.Conquests,
  RankType.Atoms,
  RankType.Hydros,
  RankType.MIRV,
]);

function isWarRanking(rankType: RankType): boolean {
  return warRankings.has(rankType);
}

@customElement("ranking-controls")
export class RankingControls extends LitElement {
  @property({ type: Number }) rankType = RankType.Lifetime;

  private onSort(type: RankType) {
    this.dispatchEvent(new CustomEvent("sort", { detail: type }));
  }

  render() {
    return html`
      <!-- Main categories  -->
      <div class="flex items-end justify-center p-6 pb-2 gap-5"> 
        <button
          class="rounded-lg bg-blue-600 text-white text-lg p-3 hover:bg-blue-400 ${this.rankType === RankType.Lifetime ? "active" : ""}"
          style="${this.rankType === RankType.Lifetime ? "outline: solid 2px white; font-weight: bold;" : ""}"
          @click=${() => this.onSort(RankType.Lifetime)}
        >
          ${translateText("game_info_modal.duration")}
        </button>
        <button
          class="rounded-lg bg-blue-600 text-white text-lg p-3 hover:bg-blue-400 ${
            [
              RankType.Conquests,
              RankType.Atoms,
              RankType.Hydros,
              RankType.MIRV,
            ].includes(this.rankType)
              ? "active"
              : ""
          }"
          style="${isWarRanking(this.rankType) ? "outline: solid 2px white; font-weight: bold;" : ""}"
          @click=${() => this.onSort(RankType.Conquests)}
        >
          ${translateText("game_info_modal.war")}
        </button>
        <button
          class="rounded-lg bg-blue-600 text-white text-lg p-3 hover:bg-blue-400 ${
            [
              RankType.TotalGold,
              RankType.StolenGold,
              RankType.ConqueredGold,
              RankType.TradedGold,
            ].includes(this.rankType)
              ? "active"
              : ""
          }"
          style="${isEconomyRanking(this.rankType) ? "outline: solid 2px white; font-weight: bold;" : ""}"
          @click=${() => this.onSort(RankType.TotalGold)}
        >
          ${translateText("game_info_modal.economy")}
        </button>
      </div>
    </div>
  
    <!-- War subranking  -->
    <div class="flex items-end justify-center gap-3" style="${isWarRanking(this.rankType) ? "opacity:1; display: block" : "opacity: 0; display: none"}"> 
      <button
        @click=${() => this.onSort(RankType.MIRV)}
        class="rounded-md bg-blue-50 text-black text-sm p-2 hover:bg-blue-200"
        style="${isBombRanking(this.rankType) ? "outline: solid 2px white; font-weight: bold;" : ""}"
      >${translateText("game_info_modal.bombs")}</button>
      <button
        @click=${() => this.onSort(RankType.Conquests)}
        class="rounded-md bg-blue-50 text-black text-sm p-2 hover:bg-blue-200"
        style="${this.rankType === RankType.Conquests ? "outline: solid 2px white; font-weight: bold;" : ""}"
      >${translateText("game_info_modal.conquests")}</button>
    </div>

    <!-- Economy subranking  -->
    <div class="flex items-end justify-center gap-3" style="${isEconomyRanking(this.rankType) ? "opacity:1; display: block" : "opacity: 0; display: none"}"> 
      <button
        @click=${() => this.onSort(RankType.TradedGold)}
        class="rounded-md bg-blue-50 text-black text-sm p-2 hover:bg-blue-200"
        style="${this.rankType === RankType.TradedGold ? "outline: solid 2px white; font-weight: bold;" : ""}"
      >${translateText("game_info_modal.trade")}</button>
      <button
        @click=${() => this.onSort(RankType.StolenGold)}
        class="rounded-md bg-blue-50 text-black text-sm p-2 hover:bg-blue-200"
        style="${this.rankType === RankType.StolenGold ? "outline: solid 2px white; font-weight: bold;" : ""}"
      >${translateText("game_info_modal.pirate")}</button>
      <button
        @click=${() => this.onSort(RankType.ConqueredGold)}
        class="rounded-md bg-blue-50 text-black text-sm p-2 hover:bg-blue-200"
        style="${this.rankType === RankType.ConqueredGold ? "outline: solid 2px white; font-weight: bold;" : ""}"
      >${translateText("game_info_modal.conquered")}</button>
      <button
        @click=${() => this.onSort(RankType.TotalGold)}
        class="rounded-md bg-blue-50 text-black text-sm p-2 hover:bg-blue-200"
        style="${this.rankType === RankType.TotalGold ? "outline: solid 2px white; font-weight: bold;" : ""}"
      >${translateText("game_info_modal.total_gold")}</button>
    </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}
